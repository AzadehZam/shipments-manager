import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ShipmentList from './components/ShipmentList';
import ShipmentInfo from './components/ShipmentInfo';


interface ICargo {
  type: string;
  description: string;
  volume: string;
}

interface IService {
  type: string;
  value?: string;
}

interface AppState {
  id: string;
  name: string;
  cargo: ICargo[];
  mode: string;
  type: string;
  destination: string;
  origin: string;
  services: IService[];
  total: string;
  status: string;
  userId: string;
}

interface ListItem {
  id: string;
  name: string;
  mode: string;
  destination: string;
  origin: string;
  status: string;
}

function App() {

  const [shipments, setShipments] = useState<AppState[]>([]);
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<AppState>({
    id: '',
    name: '',
    cargo: [],
    mode: '',
    type: '',
    destination: '',
    origin: '',
    services: [],
    total: '',
    status: '',
    userId: '',
  });


  useEffect(() => {
    fetch("http://localhost:3000/shipments")
      .then(res => res.json())
      .then(res => {
        const response: AppState[] = res;
        setShipments(response);
      })
  }, [])

  useEffect(() => {
    const newListItems: ListItem[] = []
    shipments.map(shipment => 
      newListItems.push({
        id: shipment.id,
        name: shipment.name,
        mode: shipment.mode,
        destination: shipment.destination,
        origin: shipment.origin,
        status: shipment.status
      })
    )
    setListItems(newListItems);
  }, [shipments])
  
  const handleSelect = (id: string) => {
    const selected: any = shipments.find(item => item.id === id)
    setSelectedShipment(selected);
  }

  const handleEditName = (newName: string) => {
    const editedShipment = {...selectedShipment,name: newName}
    setSelectedShipment(editedShipment);
    const changedShipmentIndex = shipments.findIndex(item => item.id === selectedShipment.id);
    const newShipments = [...shipments]
    newShipments.splice(changedShipmentIndex, 1, editedShipment);
    setShipments(newShipments);
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact>
            <ShipmentList listItems={listItems} onSelect={handleSelect} />
          </Route>
          <Route path='/shipmentInfo/:id'>
            <ShipmentInfo selectedShipment={selectedShipment} onEditName={handleEditName}/>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
