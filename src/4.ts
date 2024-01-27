enum PersonRole {
  Owner = 'Owner',
  OwnersWife = 'OwnersWife',
  Stranger = 'Stranger',
}

class Key {
  private signature: number;
  constructor() {
    this.signature = Math.random();
  }

  public getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key, public status: string) {
    this.key = key;
  }

  public getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  private tenants: Person[] = [];

  constructor(private key: Key) {
    this.key = key;
  }

  abstract openDoor(key: Key): void;

  protected getHouseKey(): number {
    return this.key.getSignature();
  }

  public comeIn(person: Person): void {
    this.door && this.tenants.push(person);
  }

  public getTenantsList(): string[] {
    return this.tenants.map(({ status }) => status);
  }
}

class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }

  public openDoor(enteredKey: Key): void {
    this.door = enteredKey.getSignature() === this.getHouseKey();
  }
}

const key = new Key();
const falseKey = new Key();

const house = new MyHouse(key);
const person = new Person(key, PersonRole.Owner);
const personsWife = new Person(key, PersonRole.OwnersWife);
const robber = new Person(falseKey, PersonRole.Stranger);

house.openDoor(person.getKey());
house.comeIn(person);
house.getTenantsList(); // ["Owner"]

house.openDoor(personsWife.getKey());
house.comeIn(personsWife);
house.getTenantsList(); // ["Owner","OwnersWife"]

house.openDoor(robber.getKey());
house.comeIn(robber);
house.getTenantsList(); // ["Owner","OwnersWife"]

export {};
