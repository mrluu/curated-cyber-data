import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import AddVuln from "./AddVuln";

const client = new ApolloClient({
  uri: "https://us-central1-curated-cyber-data.cloudfunctions.net/api/graphql",
});

const cveStyle = {
  fontWeight: "900",
  fontSize: "20px"
}

const initialState = {
  showAddVulnModal: false,
}

class Vulnerabilities extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  hideAddVulnModal() {
    this.setState({
      showAddVulnModal: false
    });
  }

  showAddVulnModal() {
    this.setState({
      showAddVulnModal: true
    });
  }

  displayAffectedProducts(affectedProducts) {
    return affectedProducts.map((product) => {
      return (<p key={product.cpe}>{product.cpe}</p>);
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="page-background">
          <div className="page-banner">Vulnerabilities</div>
          <AddVuln
            showModal={this.state.showAddVulnModal}
            hideModalHandler={() => this.hideAddVulnModal()}
          />
          <button onClick={() => this.showAddVulnModal()}>
            Add Vulnerability
          </button>
          <hr/>
          <div className="view-vulns">
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
        </div>
      </ApolloProvider>
    );
  }
}

export default Vulnerabilities;
