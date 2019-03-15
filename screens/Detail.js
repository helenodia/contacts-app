import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Constants, WebBrowser } from 'expo';
import { Ionicons } from '@expo/vector-icons';

class Detail extends Component {
	constructor(props) {
		super(props);
	};

	static navigationOptions = ({ navigation }) => {
		const { name, filmUrl } = navigation.getParam('contact'); //from handlepress fn

		return {
			title: name, // from the above line
			headerTintColor: '#fff',
			headerStyle: {
				backgroundColor: '#2a3daa',
			},
			headerRight: ( 
				<TouchableOpacity
		      		onPress={ () =>  WebBrowser.openBrowserAsync( filmUrl )}
		      		underlayColor='#e4e4e4' 
				>
		      		<Ionicons 
		      			name='md-film' 
		      			size={32} 
		      			color='#fff'
		      			style={{marginRight: 10}}
		        	/>
	        	</TouchableOpacity>
        )};
  	};

	render() {
		const { name, address, picture, company, gender, filmName } = this.props.navigation.getParam('contact');
		let pronoun = gender === 'female' ? 'She' : 'He';
		let possPronoun = gender === 'female' ? 'Her' : 'His';

		return (
			<Fragment>
				<View style={ styles.container }>
					<Image source={ { uri: picture } } style={ styles.contactImage } />
					<Text style={ styles.baseText } >
						{ name } is { gender }.
						{'\n\n'}{ pronoun } lives at { address }.
						{'\n\n'}{ pronoun } works at { company }.
						{'\n\n'}{ possPronoun} favourite film is { filmName }.
					</Text>
				</View>
			</Fragment>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10,
	},

	contactImage: {
		height: 200,
		width: 200,
		marginBottom: 10,
	},

	baseText: {
		fontSize: 18,
	},

	contactItem: {
		marginTop: 50,
	},
});

export default Detail;