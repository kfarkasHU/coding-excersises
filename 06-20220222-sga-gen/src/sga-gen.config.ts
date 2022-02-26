export const SGAGEN_CONF = Object.freeze({
  Checksum: {
    Matrix: [2, 1, 2, 1, 2, 1, 2, 1, 2],
    Modulo: 10
  },
  Birthdate: {
    Year: {
      MinimumValue: 1800,
      MaximumValue: 1980,
      ForceOddValues: false
    },
    Month: {
      ForceOddValues: false
    }
  },
  County: {
    Matrix: [
      32
    ]
  }
});
