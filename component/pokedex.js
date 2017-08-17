import React from 'react';
import {connect} from 'react-redux';

import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';

import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Pokedex extends React.Component	{
	static propTypes = {
  		data: React.PropTypes.object.isRequired,
	}
	render()	{
		if (this.props.data.error) {
	      return (
	        <Text>
	          Sadly, the requested Trainer does not exist yet.
	        </Text>
	      );
	    }

	    if (this.props.data.loading) {
	      return <ActivityIndicator />
	    }

	    return (
      <Text>
        Hey {this.props.data.Trainer.name}, there are 0 Pokemons in your pokedex
      </Text>
      )
	}
}

function mapStateToProps(state)	{
	return(
		users : state.users)
}

const TrainerQuery = gql`
  query {
    Trainer(name: "fc_mc@grandpc.org") {
      id
      name
    }
  }`
const PokedexWithData = graphql(TrainerQuery)(Pokedex)
const ListWithDataAndState = connect(
  mapStateToProps)(PokedexWithData);

export default ListWithDataAndState;