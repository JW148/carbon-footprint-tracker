const events = [
  {
    date: "23-11-07",
    run: "///influencing.senior.unions",
    area: "AGM",
    near: "South-east",
    nearest_pc: "Whitchurch",
    w3w: "CF14 1DB",
    gr: "ST155799",
    length: "10.0km",
    climb: "200m",
  },
  {
    date: "23-11-21",
    run: "///blitz.reef.minivans",
    area: "Pant-y-Wal",
    near: "South-west",
    nearest_pc: "Tonypandy",
    w3w: "CF40 2RH",
    gr: "SS987927",
    length: "10.5km",
    climb: "490m",
  },
  {
    date: "23-12-05",
    run: "///loitering.squad.successes",
    area: "Moel Penderyn",
    near: "North-west",
    nearest_pc: "Penderyn",
    w3w: "CF44 9JT",
    gr: "SN945088",
    length: "10.0km",
    climb: "510m",
  },
  {
    date: "23-12-19",
    run: "TBC",
    area: "Mari Lwyd",
    near: "South-east",
    nearest_pc: "Cardiff",
    w3w: "TBC",
    gr: "TBC",
    length: "TBC",
    climb: "TBC",
  },
  {
    date: "24-01-02",
    run: "///juicy.scuba.jacket",
    area: "Cwmaman",
    near: "North-west	",
    nearest_pc: "Aberdare",
    w3w: "CF44 6BX	",
    gr: "SO016004",
    length: "10.0km",
    climb: "505m",
  },
  {
    date: "24-01-16",
    run: "///correctly.inch.carver",
    area: "Cwmcarn",
    near: "South-east",
    nearest_pc: "Risca",
    w3w: "NP11 7FE",
    gr: "ST230935",
    length: "12.6km",
    climb: "350m",
  },
  {
    date: "24-01-30",
    run: "///tens.fairway.realm",
    area: "Pen y Fan",
    near: "North-west",
    nearest_pc: "Storey Arms",
    w3w: "LD3 8NL",
    gr: "SN982202",
    length: "8.3km",
    climb: "510m",
  },
  {
    date: "24-02-13",
    run: "///craziest.volcano.training",
    area: "Gilfach Goch",
    near: "South-west",
    nearest_pc: "Gilfach Goch",
    w3w: "TBC",
    gr: "SS979903",
    length: "11.0km",
    climb: "360m",
  },
  {
    date: "24-02-27",
    run: "///boarded.waxing.exits	",
    area: "Sirhowy Country Park",
    near: "South-east",
    nearest_pc: "Crosskeys",
    w3w: "NP11 7BD",
    gr: "ST212913",
    length: "11.1km",
    climb: "520m",
  },
  {
    date: "24-03-12",
    run: "///edges.class.slimy",
    area: "Gethin Bike Park Wales",
    near: "North-west",
    nearest_pc: "Merthyr Tydil",
    w3w: "CF48 1YZ",
    gr: "SO060030",
    length: "11.8km",
    climb: "520m",
  },
  {
    date: "24-03-26",
    run: "///stint.snacks.gasping",
    area: "Mynydd y Gaer",
    near: "South-west",
    nearest_pc: "Pen coed",
    w3w: "CF35 6NW",
    gr: "SS968859",
    length: "9.5km",
    climb: "350m",
  },
];

const columns = [
  {
    key: "date",
    label: "DATE",
  },
  {
    key: "run",
    label: "RUN",
  },
  {
    key: "area",
    label: "AREA",
  },
  {
    key: "near",
    label: "NEAR",
  },
  {
    key: "nearest_pc",
    label: "NEAREST POSTCODE",
  },
  {
    key: "w3w",
    label: "W3W",
  },
  {
    key: "gr",
    label: "GR",
  },
  {
    key: "length",
    label: "LENGTH",
  },
  {
    key: "climb",
    label: "CLIMB",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

const emissions = [
  {
    event_id: "0d2ab2cb-d5aa-42e7-9bb5-b41d004f89ad",
    driver_name: "John Doe",
    miles_to_event: 20,
    passengers: 2,
  },
];

const users = [];

module.exports = {
  events,
  columns,
  users,
  emissions,
};
