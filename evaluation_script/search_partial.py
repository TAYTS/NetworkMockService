import requests
import time

# Scenario, getting a list of shops with specific information


def rest():
    url = "https://network-mock.azurewebsites.net/contact/search/john?page=1&count=100"


    response = requests.request(
        "GET", url)
    return len(response.content), response.status_code


def graphql():
    url = "https://network-mock.azurewebsites.net/graphql"

    query = """
{
  searchContact(name: "john", page: 1, count: 100) {
    contacts {
      _id
      name {
        title
        first
        last
      }
      picture {
        thumbnail
      }
    }
  }
}
    """
    response = requests.request(
        "POST", url, json={'query': query})

    return len(response.content), response.status_code


def time_diff(is_rest, delay=0.2):
    start = time.time()
    size, status = rest() if is_rest else graphql()
    end = time.time()
    time.sleep(delay)
    return end-start, size, status


if __name__ == "__main__":
    # Rounds and delay_after_request can be varied
    # Larger rounds = better average
    # delay_after_request is the delay after each request, does NOT affect timing, meant to buffer to prevent api limit to be reached
    rounds = 150
    delay_after_request = 0.7

    total_rest, total_graphql = 0.0, 0.0
    for round_no in range(1, rounds+1):
        # Runs both rest and graphql functions
        round_time_rest, size_rest, status_rest = time_diff(
            is_rest=True, delay=delay_after_request)
        round_time_graphql, size_graphql, status_graphql = time_diff(
            is_rest=False, delay=delay_after_request)
        print("R time:\t{}\tG time:\t{}\tR size:\t{}\tG size:\t{}\tR status:\t{}\tG status:\t{}".format(
            round_time_rest, round_time_graphql, size_rest, size_graphql, status_rest, status_graphql))
        total_rest += round_time_rest
        total_graphql += round_time_graphql

        # Checks if packet content is different
        if round_no == 1:
            first_size_rest, first_size_graphql = size_rest, size_graphql
        else:
            if first_size_rest != size_rest:
                exit("REST content size mismatch. First: {} Current: {}".format(
                    first_size_rest, size_rest))
            elif first_size_graphql != size_graphql:
                exit("GraphQL content size mismatch. First: {} Current: {}".format(
                    first_size_graphql, size_graphql))

    average_rest, average_graphql = total_rest/rounds, total_graphql/rounds

    print("************************* DONE *************************\n")
    print("Average REST time:\t{}\tAverage GraphQL time:\t{}\tREST content size:\t{}\tGraphQL content size:\t{}\tREST status code:\t{}\tGraphQL status code:\t{}\n".format(
        average_rest, average_graphql, size_rest, size_graphql, status_rest, status_graphql))

    if average_rest < average_graphql:
        print("GraphQL is slower than REST by {}s or {}%".format(
            average_graphql-average_rest, (average_graphql-average_rest)/average_rest*100))
    else:
        print("GraphQL is faster than REST by {}s or {}%".format(
            average_rest-average_graphql, (average_rest-average_graphql)/average_rest*100))
