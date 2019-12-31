# Fuel Costs

This is a simple React application to calculate the fuel costs
between two locations based on the average of three things:

![First picture with DJI spark](https://i.ibb.co/nmBbgBK/Screen-Shot-2019-12-31-at-16-17-21.png)

- Kms from one place to another
- The average of fuel price
- The average of vehicule fuel consumption

## Instructions

Create a `.env` file in the root of the application and put the REACT_APP_URL variable with this:

```
https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=geometry,drawing,places
```

Update YOUR_KEY for you Api key in Google Maps

```shell
yarn start
```
