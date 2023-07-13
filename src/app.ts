import Slot from './slot-game';
import SlotSimulator from './slot-simulator';
import configuration from './../configuration';

// Create the slot and simulator instances
const slot = new Slot(configuration);
const simulator = new SlotSimulator(slot);

// Run the simulation with a large number of spins
simulator.runSimulation(100);
