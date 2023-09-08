import { Item } from '@/types'
import { faker } from '@faker-js/faker'

// Important :
// Ce fichier est temporaire + permet la vérification du front sans le back
// Il ne sera plus utilisé par la suite lorsque les routes API seront prêtes, mais restera pour
// des tests ultérieures voulu par un autre groupe/dev sur ce projet

const givenIdTeacher = [
  "0000000001",
  "0000000002",
  "0000000003",
]

const givenIdLesson = [
  "R1.04",
  "R2.06",
  "R3.09",
  "R4.01",
  "R2.01"
]

const labelLesson = [
  "Mathématiques",
  "Cryptographie",
  "Probabilité",
  "Algo avancé"
]

export const generateFakerItem = () : Item => {
  return {
    amountHours : faker.number.int({min:0,max:20}),
    lesson : {
      givenId : faker.helpers.arrayElement(givenIdLesson),
      label : faker.helpers.arrayElement(labelLesson),
      Id : faker.string.uuid()
    },
    teacher : {
      firstname : faker.person.firstName(),
      lastname : faker.person.lastName(),
      givenId : faker.helpers.arrayElement(givenIdTeacher),
      Id : faker.string.uuid()
    },
    Id : faker.string.uuid()
  };
}

export const generateFakerArrayItem = () : Item[] => {
  const array = [];
  for (let index = 0; index < 5; index++) { // Changer le index < NUMBER
    array.push(generateFakerItem());
  }
  return array
}