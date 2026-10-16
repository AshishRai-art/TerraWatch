export const navigationGroups = [
  ["OVERVIEW", [["Dashboard", "◫"], ["Map", "⌖"], ["Digital Twin", "◇"]]],
  ["MONITORING", [["Nodes", "◉"], ["Sensors", "⌁"], ["Seismometer", "∿"], ["Analytics", "⌁"], ["APCI", "◌"], ["AI Assistant", "✦"]]],
  ["OPERATIONS", [["Alerts", "!"], ["Incidents", "▣"], ["Remote Inspection", "◒"], ["History", "◷"]]],
  ["SYSTEM", [["System Health", "♥"], ["Communication", "⌁"], ["Power", "ϟ"], ["Maintenance", "⚒"]]],
  ["REFERENCE", [["Reports", "▤"], ["Settings", "⚙"]]]
];

export const statusMeta = {
  NORMAL: { class: "normal", color: "#138a72", icon: "●" },
  WATCH: { class: "watch", color: "#a76400", icon: "●" },
  WARNING: { class: "warning", color: "#bc571b", icon: "▲" },
  HIGH: { class: "high", color: "#b42338", icon: "▲" },
  OFFLINE: { class: "offline", color: "#64748b", icon: "●" }
};

const prototypeNodes = [
  { id:"N01", location:"North Ridge", zone:"Zone A", status:"NORMAL", apci:12, tilt:0.18, crack:1.2, settlement:2.1, moisture:18, vibration:0.09, battery:92, rssi:-83, snr:8.2, health:"Healthy", sync:"8 sec ago", pos:[22,28], lat:28.5072, lng:77.0941, trend:"stable" },
  { id:"N02", location:"East Drift", zone:"Zone B", status:"NORMAL", apci:16, tilt:0.21, crack:1.4, settlement:2.4, moisture:20, vibration:0.11, battery:87, rssi:-91, snr:6.4, health:"Healthy", sync:"6 sec ago", pos:[69,30], lat:28.5051, lng:77.1108, trend:"stable" },
  { id:"N03", location:"West Chamber", zone:"Zone C", status:"WARNING", apci:58, tilt:0.86, crack:4.8, settlement:8.7, moisture:43, vibration:0.38, battery:76, rssi:-88, snr:5.7, health:"Healthy", sync:"4 sec ago", pos:[35,66], lat:28.4974, lng:77.0973, trend:"rising" },
  { id:"N04", location:"Ventilation Shaft", zone:"Zone D", status:"WATCH", apci:34, tilt:0.42, crack:2.3, settlement:3.9, moisture:31, vibration:0.15, battery:65, rssi:-102, snr:2.8, health:"Healthy", sync:"11 sec ago", pos:[75,62], lat:28.4986, lng:77.1137, trend:"rising" },
  { id:"N05", location:"South Stope", zone:"Zone E", status:"NORMAL", apci:14, tilt:0.17, crack:1.1, settlement:1.9, moisture:19, vibration:0.08, battery:48, rssi:-98, snr:4.1, health:"Fault: crack meter", sync:"5 sec ago", pos:[56,82], lat:28.4902, lng:77.1056, trend:"flatline" },
  { id:"N06", location:"Lower Gallery", zone:"Zone F", status:"OFFLINE", apci:0, tilt:null, crack:null, settlement:null, moisture:null, vibration:null, battery:61, rssi:null, snr:null, health:"Communication gap", sync:"24 min ago", pos:[16,83], lat:28.4896, lng:77.0919, trend:"offline" },
  { id:"N07", location:"Main Entry", zone:"Zone G", status:"NORMAL", apci:9, tilt:0.12, crack:0.9, settlement:1.5, moisture:16, vibration:0.07, battery:96, rssi:-78, snr:10.8, health:"Healthy", sync:"9 sec ago", pos:[88,49], lat:28.5013, lng:77.1192, trend:"stable" }
];

export function createPrototypeNodes() {
  return prototypeNodes.map(node => ({ ...node, pos: [...node.pos] }));
}
