//Provide structuredClone() as a global variable so that fake-indexeddb can
//access it.
import 'core-js/actual/structured-clone.js';
//Import reflect-metadata so that Inversify decorators work as expected.
import 'reflect-metadata';