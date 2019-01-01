import React from 'react';
import TraductorForm from '../forms/TraductorForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from '../../actions/translate';
import ObjectDetailModal from '../tools/ObjectDetailModal';
import ObjectTable from '../forms/ObjectTable';
import { Message } from 'semantic-ui-react'
import MDSpinner from 'react-md-spinner';

class TraductorPage extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            errors: {},
            objectDetailData: {
                mediaLengua: "",
                spanishContent: "",
                kichwaContent: "",
                elicitSentenceContent: "",
                ipaContent: ""
            },
            objectDetailOpen: false,
            objectDetailSize: "tiny",
            hideResultMessage: true,
            hideSpinner: true,
            hideObjectDetail: true
        }
        this.spinnerStyle = { display: 'none' };
    }

    objectDetailCloseCallback = (closeAlert) => {
        this.setState({
            "objectDetailOpen": closeAlert
        });
    }


    submit = (data) => {
        this.setState({ "hideSpinner": false });

        return this.props.translate(data.object.trim().toLowerCase())
            .then((resp) => {
                this.setState({ "hideSpinner": true });

                console.log('Result in Traductor Page');
                let data = this.parseResponse(resp);

                console.log(data);
                //Here we update the data for the ObjectTable
                if (data && data.length > 0 && typeof data[0] === 'object') {
                    this.setState({
                        "data": data,
                        "hideResultMessage": true,
                    });

                } else {
                    this.setState({
                        "data": [],
                        "hideResultMessage": false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    objectSelectedCallback=(objectSelected)=>{
        this.setState({
            "objectDetailOpen":true,
            "objectDetailData":objectSelected
        });

    }

    render() {
        this.spinnerStyle = this.state.hideSpinner ? { display: 'none' } : {};

        return (
            <div>
                {/* Submit is the callback */}
                <TraductorForm submit={this.submit} objectList={this.state.data} />

                <Message hidden={this.state.hideResultMessage}>
                    <Message.Header>Error</Message.Header>
                    <p>There is no results</p>
                </Message>

                <ObjectTable
                    objectList={this.state.data} 
                    objectSelectedCallback = {this.objectSelectedCallback}/>
                <MDSpinner style={this.spinnerStyle} />

                <ObjectDetailModal
                    objectDetailSize={this.state.objectDetailSize}
                    objectDetailOpen={this.state.objectDetailOpen}
                    objectDetailData={this.state.objectDetailData}
                    objectDetailCloseCallback={this.objectDetailCloseCallback} />
            </div>
        );
    }

    parseResponse(response) {
        let body = JSON.parse(response);

        if (body.status == '200') {
            return body.data;
        } else {
            return body.message;
        }
    }
}

TraductorPage.propTypes = {
    translate: PropTypes.func.isRequired
};

export default connect(null, { translate })(TraductorPage);