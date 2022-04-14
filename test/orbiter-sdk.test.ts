import { OrbiterSdk } from '../src/orbiter-sdk'

/**
 * OrbiterSdk test
 */
describe('OrbiterSdk test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('OrbiterSdk is instantiable', () => {
    expect(new OrbiterSdk()).toBeInstanceOf(OrbiterSdk)
  })
})
