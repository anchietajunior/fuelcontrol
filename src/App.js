import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import Map from "./components/Map";

function App() {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [kmsByLt, setkmsByLt] = useState("");
  const [price, setPrice] = useState("");
  const [totalCosts, setTotalCosts] = useState(0);
  const [distance, setDistance] = useState(0);
  const [startCoordinates, setStartCoordinates] = useState({
    lat: null,
    lng: null
  });
  const [destinationCoordinates, setDestinationCoordinates] = useState({
    lat: null,
    lng: null
  });
  const handleSelectedStart = async value => {
    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0]);
    setStart(value);
    setStartCoordinates(latLng);
  };

  const handleSelectedDestination = async value => {
    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0]);
    setDestination(value);
    setDestinationCoordinates(latLng);
  };

  const handleCalculation = () => {
    if (distance && kmsByLt && price) {
      const fixedPrice = parseFloat(`${price}`.replace(",", "."));
      const calcResult = ((distance * fixedPrice) / kmsByLt).toFixed(2);
      setTotalCosts(calcResult);
    } else {
      alert("Preencha todos os campos");
    }
  };

  const handleUpdateDistance = value => {
    setDistance(value);
  };

  return (
    <>
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container d-flex justify-content-center">
          <a
            href="https://github.com/anchietajunior"
            className="navbar-brand d-flex align-items-center"
          >
            <strong>Custos de viagem | Anchieta Júnior</strong>
          </a>
        </div>
      </div>
      <div
        className="App"
        style={{ height: `100wh`, width: `95%`, margin: `0 auto` }}
      >
        <div className="row mt-5">
          <div
            className="col-lg-6 col-md-12"
            style={{ height: `800px`, borderRight: `1px solid #666` }}
          >
            <h1>Map</h1>
            <div className="row">
              <div className="col-lg-12"></div>
              <div className="col-lg-12">
                <Map
                  startCoordinates={startCoordinates}
                  destinationCoordinates={destinationCoordinates}
                  handleUpdateDistance={handleUpdateDistance}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12" style={{ height: `90%` }}>
            <h1>Dados da viagem</h1>
            <form>
              <PlacesAutocomplete
                value={start}
                onChange={setStart}
                onSelect={handleSelectedStart}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      {...getInputProps({ placeholder: "Partida" })}
                    />
                    <div>
                      {loading ? (
                        <div className="d-flex justify-content-center">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : null}

                      {suggestions.map(suggestion => {
                        const style = {
                          backgroundColor: suggestion.active
                            ? "#348498"
                            : "#FFFFFF",
                          padding: `15px`,
                          borderBottom: `1px solid #666`,
                          borderRight: `1px solid #666`,
                          borderLeft: `1px solid #666`,
                          width: `100%`,
                          zIndex: 50 //Forcing it to front
                        };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, { style })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>

              <PlacesAutocomplete
                value={destination}
                onChange={setDestination}
                onSelect={handleSelectedDestination}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      {...getInputProps({ placeholder: "Destino" })}
                    />
                    <div>
                      {loading ? (
                        <div className="d-flex justify-content-center">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : null}

                      {suggestions.map(suggestion => {
                        const style = {
                          backgroundColor: suggestion.active
                            ? "#348498"
                            : "#FFFFFF",
                          padding: `15px`,
                          borderBottom: `1px solid #666`,
                          borderRight: `1px solid #666`,
                          borderLeft: `1px solid #666`,
                          width: `100%`,
                          zIndex: 50 //Forcing it to front
                        };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, { style })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>

              <div className="form-group">
                <div className="row">
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Consumo médio por litro"
                      value={kmsByLt}
                      onChange={e => setkmsByLt(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Preço do combustível"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: `100%` }}
                  onClick={handleCalculation}
                >
                  Calcular gastos
                </button>
              </div>
            </form>
            <div className="col-lg-12" style={{ height: `90%` }}>
              {totalCosts ? (
                <div>
                  <hr />
                  <h1>Resultado</h1>
                  <div className="row" style={{ fontSize: `1.8em` }}>
                    <div className="col-lg-12" style={{ height: `90%` }}>
                      <strong>Distancia (Kms): </strong>{" "}
                      {distance.toString().replace(".", ",")}
                    </div>
                    <div className="col-lg-12" style={{ height: `90%` }}>
                      <strong>Total:</strong> R${" "}
                      {totalCosts.toString().replace(".", ",")}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
