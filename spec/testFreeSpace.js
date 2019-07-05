// Test new element for overlapped with existing
export function testFreeSpace(massif, newSprite) {
    if (massif.every(ArrTest, newSprite)) {
      return true;
    }
    function ArrTest (oldSprite) {
    return newSprite.x < oldSprite.x-oldSprite.width*1.1 || newSprite.x > oldSprite.x+oldSprite.width*1.1
    }
  }