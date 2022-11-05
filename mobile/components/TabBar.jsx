import React from 'react'; 

import {View, Pressable, Dimensions, StyleSheet} from 'react-native'
import NavIcon from './NavIcon';

const {width} = Dimensions.get('window')

const TabBar = ({ state, descriptors, navigation}) =>{
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key = {index} style = {[styles.mainItemContainer, {borderRightWidth: label=="notes"? 3:0}]}>
            <Pressable
              onPress = {onPress}
              style = {{color: isFocused && "#810CDD"}}>
              <View style = {{ borderTop: isFocused && "3px solid #810CDD", justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15}}>
                {/* <NavigationIcon route={label} isFocused={isFocused}/> */}
				<NavIcon label={label} isFocused={isFocused}/>
				<p style={{fontSize: "12px", fontWeight: isFocused && 'bold'}}>{label}</p>
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
	width: "100%",
    backgroundColor: "#E1E1E1",
    borderTopRightRadius: 10,
	borderTopLeftRadius: 10,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  }
})


export default TabBar; 