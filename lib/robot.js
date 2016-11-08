'use strict';

const compass = ['north', 'east', 'south', 'west']

class Robot {
  constructor(bearing) {
    this.bearing = bearing
    this.coordinates = [0,0]
  }

  orient(direction) {
    if (compass.includes(direction)) {
      this.bearing = direction
      return this.bearing
    } else {
      throw new Error("Invalid Robot Bearing")
    }
  }

  turnRight() {
    this.bearing = compass[(compass.indexOf(this.bearing) + 1) % 4]
    return this.bearing
  }

  turnLeft() {
    this.bearing = compass[(compass.indexOf(this.bearing) - 1 + 4) % 4]
    return this.bearing
  }

  advance() {
    if (this.bearing === 'north') {
      this.coordinates[1]++
    } else if (this.bearing === 'south') {
      this.coordinates[1]--
    } else if (this.bearing === 'east') {
      this.coordinates[0]++
    } else if (this.bearing === 'west') {
      this.coordinates[0]--
    }
    return this.coordinates
  }

  at(x, y) {
    if (x !== null) {this.coordinates[0] = x}
    if (y !== null) {this.coordinates[1] = y}
    return this.coordinates
  }

  instructions(instructs) {
    let instrFns = instructs.split("").map((letter)=> {
      switch(letter) {
      case 'L':
        return 'turnLeft';
        break;
      case 'R':
        return 'turnRight';
        break;
      case 'A':
        return 'advance';
        break;
      }
    })
    return instrFns
  }

  place(info) {
    this.coordinates = [info.x, info.y]
    this.orient(info.direction)
  }

  evaluate(instructs){
    this.instructions(instructs).forEach((fn)=>{
      this[fn]()
    })
    return this.coordinates
  }


}
