import React from 'react';
import './Launches.css';
import { connect, ConnectedProps } from 'react-redux';
import moment from 'moment';
import { uniqBy } from 'lodash';

import axios from '../../axios-api';
import { Agency } from '../../models/agency.interface';
import {
  RootState,
  LOAD_LAUNCHES,
  LOADED_LAUNCHES,
  LOAD_AGENCIES,
  LOADED_AGENCIES,
  API_ERROR,
} from '../../store/types';

import FormDate from '../../components/Form/FormDate/FormDate';
import FormSelect from '../../components/Form/FormSelect/FormSelect';
import FormButton from '../../components/Form/FormButton/FormButton';
import LaunchList from '../../components/LaunchList/LaunchList';
import LaunchMap from '../../components/LaunchMap/LaunchMap';
import { Launch } from '../../models/launch.interface';
import { getAgenciesInLaunch } from '../../utils/launchAgencies';

const mapState = (state: RootState) => ({
  loading: state.loading,
  launches: state.launches,
  agencies: state.agencies,
  hasError: state.error,
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
  loadedLaunches: (launches: Launches[]) => ({
    type: LOADED_LAUNCHES,
    payload: launches,
  }),
  loadAgencies: () => ({
    type: LOAD_AGENCIES,
  }),
  loadedAgencies: (agencies: Agency[]) => ({
    type: LOADED_AGENCIES,
    payload: agencies,
  }),
  apiError: () => ({
    type: API_ERROR,
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
    this.props.loadAgencies();

    // Fetch agencies
    axios
      .get(`/agency`)
      .then((response) => {
        // Dispatch action with fetched agencies
        this.props.loadedAgencies(response.data.agencies);
      })
      .catch(() => {
        this.props.apiError();
      });
  }

  startDateChanged(date: moment.Moment) {
    this.setState({ startDate: date });
  }

  endDateChanged(date: moment.Moment) {
    this.setState({ endDate: date });
  }

  agencyChanged(agencyId: string) {
    this.setState({
      agency:
        this.props.agencies.find(
          (agency) => agency.id === parseInt(agencyId)
        ) || null,
    });
    // console.log(agencyId);
  }

  typeChanged(type: string) {
    console.log(type);
  }

  submitForm(event: any) {
    event.preventDefault();

    const { startDate, endDate } = this.state;

    // Dispatch action
    this.props.submit({
      startDate,
      endDate,
    });

    // Fetch launches
    axios
      .get(
        `/launch/${startDate.format('YYYY-MM-DD')}/${endDate.format(
          'YYYY-MM-DD'
        )}`
      )
      .then((response) => {
        // Dispatch action with fetched launch dates
        this.props.loadedLaunches(response.data.launches);
        const allAgencies = response.data.launches.reduce(
          (all: Agency[], launch: Launch) => {
            return [...all, ...getAgenciesInLaunch(launch)];
          },
          []
        );
        const uniqAgencies = uniqBy<Agency>(allAgencies, 'id');
        this.props.loadedAgencies(uniqAgencies);
      })
      .catch(() => {
        this.props.apiError();
      });
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
            title="Filter Agency"
            changed={(event) => this.agencyChanged(event)}
            value={this.state.agency?.id.toString()}
            options={this.props.agencies.map((agency) => ({
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
          <FormButton loading={this.props.loading}></FormButton>
        </form>
        {this.props.hasError ? (
          <div className="Error">An error has occured</div>
        ) : (
          ''
        )}
        <LaunchList
          launches={this.props.launches}
          agency={this.state.agency}
        ></LaunchList>
        <LaunchMap></LaunchMap>
      </>
    );
  }
}

export default connector(Launches);
