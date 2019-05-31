import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://us-central1-curated-cyber-data.cloudfunctions.net/api/graphql",
});

const cveStyle = {
  fontWeight: "900",
  fontSize: "20px"
}

class ViewVulns extends Component {
  displayAffectedProducts(affectedProducts) {
    return affectedProducts.map((product) => {
      return (<p key={product.cpe}>{product.cpe}</p>);
    });
  }

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
                  affectedProducts {
                    cpe
                  }
                }
              }
            `}
          >
            {({ loading, error, data }) => {
              if (loading)
                return <p>Loading...</p>;
              if (error)
                return <p>Error :(</p>;

              return data.vulnerabilities.map(({ id, description, affectedProducts }) => (
                <div key={id} className="vuln_data">
                  <label style={cveStyle}>{id}</label>
                  <p>{description}</p>
                  {this.displayAffectedProducts(affectedProducts)}
                  <br/>
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
