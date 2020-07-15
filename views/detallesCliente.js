import React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {Headline, Subheading, Button, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios'
const DetallesCliente = ({
    navigation,
  route: {
    params: {
      item,
      setConsultar
    },
  },
}) => {
    const  {nombre, telefono, correo, empresa,id}=item;
    const eliminarContacto=async ()=>{
        try {
            await axios.delete(`http://032e67f9b0a7.ngrok.io/clientes/${id}`);
            setConsultar(true)
            navigation.navigate("Inicio");
        } catch (error) {
            console.log(error);
        }

    }
  const mostrarConfimracion = () => {
      Alert.alert(
          "Eliminar Cliente",
          "¿Está seguro que deseas eliminar este cliente?",
          [{
              text:"Si, Eliminar",
              onPress: eliminarContacto

          },{
              text:"Cancelar",
              style:"cancel"
          }]
      )
  };
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>
        Empresa:<Subheading>{empresa}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Correo:<Subheading>{correo}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Telefono:<Subheading>{telefono}</Subheading>
      </Text>
      <Button
        onPress={mostrarConfimracion}
        mode="contained"
        icon="cancel"
        style={styles.btn}>
        Eliminar Cliente
      </Button>
      <FAB
        onPress={() => navigation.navigate('NuevoCliente', {cliente: item,setConsultar})}
        style={globalStyles.fab}
        icon="pencil"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    marginBottom: 10,
    fontSize: 18,
  },
  btn: {
    marginTop: 100,
    backgroundColor: 'red',
  },
});

export default DetallesCliente;
