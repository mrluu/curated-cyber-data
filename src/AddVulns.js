import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider, Mutation } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://us-central1-curated-cyber-data.cloudfunctions.net/api/graphql",
});

const buttonStyle = {
  width: "200px",
  height: "25px",
};

const inputStyle = {
  width: "200px",
  height: "25px",
};

const textAreaStyle = {
  width: "200px",
  height: "100px",
}

const ADD_VULN = gql`
  mutation AddVulnerability($input: VulnInput!) {
    addVulnerability(input: $input) {
      id
      description
    }
  }
`;

class AddVulns extends Component {
  render() {
    let cve = "";
    let desc = "";

    return (
      <ApolloProvider client={client}>
      <div className="page-background">
        <div className="page-banner">Add Vulnerabilities</div>
          <Mutation mutation={ADD_VULN}>
          {(addVulnerability, { data }) => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addVulnerability({ variables: { input: {id: cve.value, description: desc.value} } });
                  cve.value = "";
                  desc.value = "";
                }}
              >
                <label style={{color:"white"}}>CVE</label><br/>
                <input style={inputStyle}
                  ref={node => {
                    cve = node;
                  }}
                />
                <br/>
                <label style={{color:"white"}}>Description</label><br/>
                <textarea style={textAreaStyle}
                  ref={node => {
                    desc = node;
                  }}
                />
                <br/>
                <button style={buttonStyle} type="submit">Add Vulnerability</button>
              </form>
            </div>
          )}
        </Mutation>
      </div>
      </ApolloProvider>
    );
  }
}

export default AddVulns;
