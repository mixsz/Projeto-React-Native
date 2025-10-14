import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Jogo1 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, padding: 20 }}>
          <Text >Jogo 1</Text>
          <Button title="Click" onPress={() => this.props.navigation.navigate('Tela5')}  />
      </View>
    );
  }
}
