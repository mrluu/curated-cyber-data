import React, { Component } from 'react';
import Modal from 'react-modal';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const inputStyle = {
  width: "250px",
  height: "25px",
  borderRadius: "7px",
  marginBottom: "10px",
  fontSize: "18px"
};

const textAreaStyle = {
  width: "500px",
  height: "200px",
  borderRadius: "7px",
  marginBottom: "10px",
  fontSize: "18px"
}

const addVulnsFormStyle = {
  marginBottom: "25px"
}

const modalStyle = {
  overlay: {
    width: "700px",
    height: "500px",
    background: "#126382bf"
  },
  content: {
    background: "#545151"
  }
}

const ADD_VULN = gql`
  mutation AddVulnerability($input: VulnInput!) {
    addVulnerability(input: $input) {
      id
      description
    }
  }
`;

Modal.setAppElement(document.getElementById('root'));

class AddVuln extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.hideModalHandler();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let cve = "";
    let desc = "";

    return (
      <Modal isOpen={this.props.showModal} style={modalStyle}>
        <div className="add-vulns" style={addVulnsFormStyle}>
          <Mutation mutation={ADD_VULN}>
            {(addVulnerability, { data }) => (
              <div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    if (!cve.value || cve.value < 1) {
                      alert("CVE is required");
                    }
                    else {
                      addVulnerability({ variables: { input: {id: cve.value, description: desc.value} } });
                      cve.value = "";
                      desc.value = "";
                      this.close();
                    }
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
                  <button type="submit">Submit</button>
                  <button onClick={this.close}>Cancel</button>
                </form>
              </div>
            )}
          </Mutation>
        </div>
      </Modal>
    );
  }
}

export default AddVuln;
