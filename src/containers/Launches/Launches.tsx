import React, { ChangeEvent } from 'react';
import './Launches.css';
import { connect, ConnectedProps } from 'react-redux';
import moment from 'moment';

import FormDate from '../../components/Form/FormDate/FormDate';
import FormSelect from '../../components/Form/FormSelect/FormSelect';
import FormButton from '../../components/Form/FormButton/FormButton';
import { Agency } from '../../models/agency.interface';
import { RootState, LOAD_LAUNCHES } from '../../store/types';

const mapState = (state: RootState) => ({
  loading: state.loading,
});

const mapDispatch = {
  submit: ({
    startDate,
    endDate,
  }: {
    startDate: moment.Moment;
    endDate: moment.Moment;
  }) => ({
    type: LOAD_LAUNCHES,
    payload: { startDate, endDate },
  }),
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

type IProps = PropsFromRedux & {};
type IState = {
  startDate: moment.Moment;
  endDate: moment.Moment;
  agencies: Agency[];
  agency: null | Agency;
  type: null | 'Successful' | 'Failed';
};

class Launches extends React.Component<IProps, IState> {
  state: IState = {
    startDate: moment(),
    endDate: moment().add(3, 'months'),
    agencies: [],
    agency: null,
    type: null,
  };

  componentDidMount() {
    this.setState({
      agencies: [
        {
          id: 29,
          name: 'German Aerospace Center',
          countryCode: 'DEU',
          abbrev: 'DLR',
          type: 1,
          infoURL: 'http://www.dlr.de/',
          wikiURL: 'http://en.wikipedia.org/wiki/German_Aerospace_Center',
          infoURLs: ['http://www.dlr.de/'],
          islsp: 0,
        },
        {
          id: 30,
          name: 'Hungarian Space Office',
          countryCode: 'HUN',
          abbrev: 'HSO',
          type: 1,
          infoURL: 'http://www.hso.hu/',
          wikiURL: 'http://en.wikipedia.org/wiki/Hungarian_Space_Office',
          infoURLs: ['http://www.hso.hu/'],
          islsp: 0,
        },
      ],
    });
  }

  startDateChanged(date: moment.Moment) {
    this.setState({ startDate: date });
  }

  endDateChanged(date: moment.Moment) {
    this.setState({ endDate: date });
  }

  agencyChanged(agencyId: string) {
    console.log(agencyId);
  }

  typeChanged(type: string) {
    console.log(type);
  }

  submitForm(event: any) {
    event.preventDefault();
    this.props.submit({
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    });

    // Fetch launches
  }

  render() {
    return (
      <>
        <h1>🚀📆 Moonshot</h1>
        <form
          className="Launches-form"
          onSubmit={(event) => this.submitForm(event)}
        >
          <FormDate
            title="Start Date"
            changed={(event) => this.startDateChanged(event)}
            value={this.state.startDate}
          ></FormDate>
          <FormDate
            title="End Date"
            changed={(event) => this.endDateChanged(event)}
            value={this.state.endDate}
          ></FormDate>
          <FormSelect
            title="Agencies"
            changed={(event) => this.agencyChanged(event)}
            value={this.state.agency?.name}
            options={this.state.agencies.map((agency) => ({
              value: agency.id.toString(),
              displayValue: agency.name,
            }))}
          ></FormSelect>
          <FormSelect
            title="Launch Type"
            changed={(event) => this.typeChanged(event)}
            value={this.state.agency?.name}
            options={[
              { value: 'Successful', displayValue: 'Successful' },
              { value: 'Fail', displayValue: 'Fail' },
            ]}
          ></FormSelect>
          <FormButton loading={false}></FormButton>
        </form>
      </>
    );
  }
}

export default connector(Launches);
