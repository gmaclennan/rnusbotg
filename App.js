/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Button,
	Alert,
	DeviceEventEmitter
} from "react-native";
import RNOtgStorage from "react-native-otg-storage";

const instructions = Platform.select({
	ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
	android:
		"Double tap R on your keyboard to reload,\n" +
		"Shake or press menu button for dev menu"
});

type Props = {};

export default class App extends Component<Props> {
	constructor() {
		super();
		DeviceEventEmitter.addListener("onOTGConnected", event => {
			console.log(event, "onOTGConnected");
		});

		DeviceEventEmitter.addListener("onOTGDisconnected", event => {
			console.log(event, "onOTGDisconnected");
		});

		DeviceEventEmitter.addListener("logger", event => {
			console.log(event, "logger");
		});

		DeviceEventEmitter.addListener("newDeviceConnected", event => {
			console.log(event, "newDeviceConnected");
		});
	}

	connectDevice() {
		RNOtgStorage.connectDevice().then(d => {
			console.log(d);
		});
	}

	openDevice() {
		console.log("openDevice");
		RNOtgStorage.openDevice().then(d => {
			console.log(d, "opened");
			RNOtgStorage.openRootFolder("foo", function(data) {
				console.log(data, "foo");

				RNOtgStorage.openRootFolderFile("foo", "bar.txt", function(x) {
					console.log(x, "bar.txt");

					RNOtgStorage.udpateOrCreateRootFolderFile(
						"foo",
						"barsdf.txt",
						"sadf asdf jasdfk asf",
						function(r) {
							console.log(r);
						}
					);
				});
			});
		});
	}
	render() {
		return (
			<View style={styles.container}>
				<Button
					style={styles.buttonContainer}
					onPress={() => {
						this.connectDevice();
					}}
					title="Connect Device"
				/>
				<Button
					style={styles.buttonContainer}
					onPress={() => {
						this.openDevice();
					}}
					title="Open Device"
				/>
				<Text style={styles.welcome}>Welcome to React Native!</Text>
				<Text style={styles.instructions}>To get started, edit App.js</Text>
				<Text style={styles.instructions}>{instructions}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF"
	},
	buttonContainer: {
		margin: 20
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	},
	instructions: {
		textAlign: "center",
		color: "#333333",
		marginBottom: 5
	}
});
