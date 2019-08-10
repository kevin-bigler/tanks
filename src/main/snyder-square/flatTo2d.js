import * as R from 'ramda';

const flatTo2d = (width, index) => ({
    x: index % width,
    y: Math.floor(index / width)
});

export default R.curry(flatTo2d);