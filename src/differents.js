/* eslint-disable object-curly-newline */
import _ from 'lodash';

class Differents {
  constructor(object1, object2) {
    this.object1 = object1;
    this.object2 = object2;
  }

  getAllPropertyNames() {
    return _.union(Object.keys(this.object1), Object.keys(this.object2));
  }

  getPropertyStatus(key) {
    if (!_.has(this.object1, key)) {
      return 'added';
    }
    if (!_.has(this.object2, key)) {
      return 'deleted';
    }
    if (!_.isObject(this.object1[key]) && !_.isObject(this.object2[key])) {
      return 'objects';
    }
    if (this.object1[key] !== this.object2[key]) {
      return 'changed';
    }
    if (this.object1[key] === this.object2[key]) {
      return 'unchanged';
    }
    return false;
  }

  isPropertyAdded(key) {
    return !_.has(this.object1, key);
  }

  isPropertyDeleted(key) {
    return !_.has(this.object2, key);
  }

  isPropertyChanged(key) {
    if (_.isObject(this.object1[key]) && _.isObject(this.object2[key])) {
      return false;
    }
    return this.object1[key] !== this.object2[key];
  }

  isBothPropertyAreObjects(key) {
    return _.isObject(this.object1[key]) && _.isObject(this.object2[key]);
  }

  isPropertyUnchanged(key) {
    if (_.isObject(this.object1[key]) && !_.isObject(this.object2[key])) {
      return false;
    }
    return this.object1[key] === this.object2[key];
  }

  getAddedValue(key) {
    return this.object2[key];
  }

  getDeletedValue(key) {
    return this.object1[key];
  }

  getChangedValues(key) {
    return [this.object1[key], this.object2[key]];
  }

  getUnchangedValue(key) {
    return this.object1[key];
  }

  getBothObjects(key) {
    return [this.object1[key], this.object2[key]];
  }

  getDiff() {
    const keys = _.union(Object.keys(this.object1), Object.keys(this.object2));
    const diff = keys.sort().reduce((acc, name) => {
      if (!_.has(this.object1, name)) {
        acc[name] = 'added';
      } else if (!_.has(this.object2, name)) {
        acc[name] = 'deleted';
      } else if (_.isObject(this.object1[name]) && _.isObject(this.object2[name])) {
        acc[name] = new Differents(this.object1[name], this.object2[name]).getDiff();
      } else if (this.object1[name] === this.object2[name]) {
        acc[name] = 'unchanged';
      } else if (this.object1[name] !== this.object2[name]) {
        acc[name] = 'changed';
      }
      return acc;
    }, {});
    return diff;
  }
}

export default Differents;
