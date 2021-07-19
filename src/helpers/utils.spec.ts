import { createActionTypes } from "./utils"



describe('[Helpers]: Tests', () => {
  describe('Tests for createActionTypes utility function', () => {
    
    test('create action types success', () => {
      const types = createActionTypes(['start-fetching', 'end-fetching']) 
      expect(types).toMatchObject({
        START_FETCHING: 'start-fetching',
        END_FETCHING: 'end-fetching'
      })
    })

  })
})