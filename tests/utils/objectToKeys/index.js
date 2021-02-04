import objectToKeys from '@util/objectToKeys'
import data from './data.json'

describe('utils/objectToKeys', () => {
  it('should return the same value as the object or array parameter', () => {
    let filter

    for(let item of [0, 1]) {
      filter = (item) ? objectToKeys(data.dummy) : objectToKeys([].concat((data.dummy)))

      expect(filter).toEqual(data.expected)
    }
  })

  it('should return the same value without duplicates', () => {
    let filter = objectToKeys({
      ...data.dummy,
      address: [
        {
          roleName: new Set(),
          previlagesMenu: false
        },
        {
          roleName: 1,
          previlagesMenu: null,
          parent: void 0,
          child: {
            grandParent: null,
            siblings: {
              child: {
                parent: 111,
                grandParent: -111
              }
            }
          }
        }
      ],
      deep: {
        grandParent: {
          parent: {
            child: 1,
            siblings: null,
          },
          siblings: false, // another siblings,
          deep: {
            child: {
              parent: null, // more parent
              deep: {
                child: {
                  grandParent: null,
                  siblings: { // another siblings again
                    child: null, // too many child,
                    callback: () => { }
                  }
                }
              }
            }
          }
        }
      }
    })
    
    expect(filter).toEqual([].concat(
      data.expected, 
      [
        'address', 'roleName', 
        'previlagesMenu', 'parent', 
        'child', 'grandParent', 
        'siblings', 'deep',
        'callback'
      ]
    ))
  })

  it('should produce an empty array if the parameter is not an object or empty object', () => {
    let filter
    
    for(let item of [true, false, 1, 200, -233, 'test', '', null, undefined, void 0, {}, [], new Set()]) {
      filter = objectToKeys(item)
      
      expect(filter).toEqual([])
    }
  })
})