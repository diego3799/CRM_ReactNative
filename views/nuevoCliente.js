import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import {
  TextInput,
  Headline,
  Button,
  Dialog,
  Paragraph,
  Portal,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';
const NuevoCliente = ({
  navigation,
  route: {
    params: {setConsultar, cliente},
  },
}) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [alerta, setAlerta] = useState(false);
  const guardarCliente = async () => {
    //Validar
    if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
      return setAlerta(true);
    }
    const NuevoCliente = {
      nombre,
      telefono,
      empresa,
      correo,
    };
    if(cliente){
      try {
        await axios.put(`http://032e67f9b0a7.ngrok.io/clientes/${cliente.id}`, NuevoCliente);
        setConsultar(true);
        navigation.navigate('Inicio');
      } catch (error) {
        console.log(error);
      }

    }else{
      try {
        await axios.post('http://032e67f9b0a7.ngrok.io/clientes', NuevoCliente);
        setConsultar(true);
        navigation.navigate('Inicio');
      } catch (error) {
        console.log(error);
      }
    }
    
  };
  useEffect(() => {
    if (cliente) {
      const {nombre, telefono, correo, empresa} = cliente;
      setNombre(nombre)
      setTelefono(telefono)
      setCorreo(correo)
      setEmpresa(empresa)
    }
  }, []);

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{cliente?"Editando al Cliente":"Añadir Nuevo Cliente"}</Headline>
      <TextInput
        label="Nombre"
        placeholder="Juan"
        onChangeText={(e) => setNombre(e)}
        value={nombre}
        style={styles.input}
      />
      <TextInput
        keyboardType="number-pad"
        label="Teléfono"
        value={telefono}
        placeholder="55 4334 4242"
        onChangeText={(e) => setTelefono(e)}
        style={styles.input}
      />
      <TextInput
        label="Correo"
        keyboardType="email-address"
        autoCapitalize={'none'}
        value={correo}
        placeholder="correo@correo.com"
        onChangeText={(e) => setCorreo(e)}
        style={styles.input}
      />
      <TextInput
        label="Empresa"
        value={empresa}
        placeholder="Nombre de la Empresa"
        onChangeText={(e) => setEmpresa(e)}
        style={styles.input}
      />
      <Button icon="pencil-circle" mode="contained" onPress={guardarCliente}>
      {cliente?"Guardar Cambios":"Guardar Cliente"}
        
      </Button>
      <Portal>
        <Dialog visible={alerta} onDismiss={() => setAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph> Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlerta(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NuevoCliente;
