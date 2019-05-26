import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://us-central1-curated-cyber-data.cloudfunctions.net/api/graphql",
});

class ViewVulns extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="page-background">
          <div className="page-banner">View Vulnerabilities</div>
          <Query
            query={gql`
              {
                vulnerabilities {
                  id
                  description
                }
              }
            `}
          >
            {({ loading, error, data }) => {
              if (loading)
                return <p>Loading...</p>;
              if (error)
                return <p>Error :(</p>;

              return data.vulnerabilities.map(({ id, description }) => (
                <div key={id} className="vuln_data">
                  <label>{id}</label>
                  <p>{description}</p>
                </div>
              ));
            }}
          </Query>
        </div>
      </ApolloProvider>
    );
  }
}

export default ViewVulns;
