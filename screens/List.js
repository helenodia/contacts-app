import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

class List extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			contacts: [],
			isFetching: false, 
	};
		this.fetchContacts = this.fetchContacts.bind(this);
		this.handlePress = this.handlePress.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.refreshData = this.refreshData.bind(this);
	};

	static navigationOptions = {
		title: 'Contacts',
		headerTintColor: '#fff',
		headerStyle: {
			backgroundColor: '#2a3daa'
		},
	};

	fetchContacts() {
		axios.get('https://robocontacts.herokuapp.com/api/contacts?random')
		.then(response => {
			this.setState(
				{ contacts: response.data }
			)
		})
	};

	componentDidMount() {
		this.fetchContacts()  //calling fc with no args
	};

	keyExtractor(item, index) {
		return `${ index }`;
	};

	handlePress(item) { 
		this.props.navigation.navigate(
			'Detail', {
				contact: item
			}
		)
	};

	refreshData() {
		axios.get('https://robocontacts.herokuapp.com/api/contacts?random')
		.then(response => {
			this.setState(
				{ contacts: response.data }
			)
		})
	};

	renderItem({ item }) {
		return (			
			<TouchableHighlight 
				onPress={ () => this.handlePress(item) } //anon function to get data into detail.js
				underlayColor='#e4e4e4' 
			>		
				<View style={ styles.itemContainer }>
					<ListItem
				  		leftAvatar={{
				   			title: item.name[0],
				    		source: { uri: item.picture },
				    		showEditButton: false,
				  		}}
				  		title={ item.name }
				  		subtitle={ item.company }
				  		subtitleStyle={ styles.subtitle }
				  		chevron={
				  			<Ionicons 
				  				name='ios-arrow-forward' 
				  				size={16} 
				  				color='#ddd' 
				  			/>
				  		}
					/>
				</View> 
			</TouchableHighlight>
		)
	};

	renderSeparator() {
		const style = { height: 1, backgroundColor: 'lightgray' };
		return <View style={ style } />;
	};

	render() {
	let { contacts, isFetching } = this.state;
	
		if ({ contacts }) {
			return (
				<FlatList 
					data={ contacts } 
					renderItem={ this.renderItem } 
					keyExtractor={ this.keyExtractor } 
					ItemSeparatorComponent={ this.renderSeparator } 
					onRefresh={ this.refreshData }
					refreshing={ isFetching }
				/>
			)
		} else {
			return (
				<ActivityIndicator size="large" color='#222' />
			)
		}
	}
};

const styles = StyleSheet.create({
	itemContainer: {
		justifyContent: 'center',
		backgroundColor: '#ffff',
		height: 50,
		paddingLeft: 10,
		marginBottom: 10,
		marginTop: 10,
	},

	item: {
		fontSize: 18,
	},

	subtitle: {
		color: 'gray',
	},
});

export default List;


