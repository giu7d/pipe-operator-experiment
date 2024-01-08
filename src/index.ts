import Stream from './pipe'

console.log('Hello World!')

//  1. Example on how to use the pipe operator
const returnValue = new Stream([1, 2, 3])
  .pipe((x) => x.map((y) => y + 1))
  .pipe((x) => x.reduce((acc, curr) => acc + curr, 0))
  .pipe((x) => x * 2)
  .end()

console.log(returnValue)

//
//  2. Example of its usage in a controller
//     Create user and return user's id
//
type User = {
  id: number
  name: string
}

const createUser = (name: string): User => {
  return {
    id: Math.floor(Math.random() * 1000),
    name
  }
}

const persistUser = async (user: User): Promise<User> => {
  return new Promise((resolve) => {
    console.log('Persisting user', user)
    resolve(user)
  })
}

const getUserId = async (user: Promise<User>): Promise<number> => {
  return new Promise((resolve) => {
    void user.then((user) => {
      console.log('Getting user id', user)
      resolve(user.id)
    })
  })
}

const userId = new Stream('John Doe')
  .pipe(createUser)
  .pipe(persistUser)
  .pipe(getUserId)
  .end()

void userId.then((id) => {
  console.log('Result', 'User id', id)
})
