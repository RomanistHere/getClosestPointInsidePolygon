class Wrapper {
  // Implement the getClosestPointInsidePolygon function.
  // This should be implemented in a typed language, ideally Typescript.
  // You can assume that the polygon is not self intersecting.




  Point: {
    x: number;
    y: number;
  };
  // it's the formula to find the closest point to the given on line
  // line defined by two points x1 and x2; given point: <point>
  calcDistBetweenLineAndPoint(x1: Point, x2: Point, point: Point): Point {
    // we want to describe it as quadratic equation
    // right now I get this from wikipedia, but I did some proofs on this back in the school and university
    const a: number = x1.y - x2.y;
    const b: number = x2.x - x1.x;
    const c: number = x1.x * x2.y - x2.x * x1.y;

    let x: number = (b * (b * point.x - a * point.y) - a * c) / (Math.pow(a, 2) + Math.pow(b, 2));
    let y: number = (a * (a * point.y - b * point.x) - b * c) / (Math.pow(a, 2) + Math.pow(b, 2));

    // we solved it for line, but what about segments
    x = this.checkAndFix(x, x1.x, x2.x);
    y = this.checkAndFix(y, x1.y, x2.y);

    return { x: x, y: y };
  }

  countDistance(point1: Point, point2: Point): number {
    const a: number = point1.x - point2.x;
    const b: number = point1.y - point2.y;

    return Math.sqrt( a*a + b*b );
  }

  checkAndFix(point: number, limit1: number, limit2: number): number {
    // if our dot is out of range, make it equal to the closest limitation point of the segment
    let fixedPoint: number = null;

    if (point <= limit1 && point <= limit2) {
      fixedPoint = (limit2 >= limit1) ? limit1 : limit2;
    } else if (point >= limit1 && point >= limit2) {
      fixedPoint = (limit2 >= limit1) ? limit2 : limit1;
    } else {
      fixedPoint = point;
    }

    return fixedPoint;
  }

  getClosestPointInsidePolygon(poly: Point[], pos: Point): Point {
    const numberOfSides: number = poly.length;
    // check if everything good
    if (pos == null) {
      throw new Error('No point provided')
    }

    if (numberOfSides === 1) {
      return poly[0]
    } else if (numberOfSides < 1) {
      throw new Error('Provide correct dimensions')
    }

    let minDistance: number = null;
    let neededPoint: Point;

    // loop can probably be improved (removed), it's just something that came on my mind from start
    for (let i = 0; i < numberOfSides; i++) {
      const nextIteration: number = (i + 1 >= numberOfSides) ? 0 : i + 1;
      const closestPoint: Point = this.calcDistBetweenLineAndPoint(poly[i], poly[nextIteration], pos);
      const distance: number = this.countDistance(closestPoint, pos);

      if (minDistance === null || (minDistance !== null && minDistance > distance)) {
        minDistance = distance;
        neededPoint = closestPoint;
      }
    }

    // what would I improve:
    // - when we have few points that are on the same distance, we will get only one
    // - it won't work for circles and other round figures
    return neededPoint
  }


  // example input:
  // getClosestPointInsidePolygon([
  // { x: 0, y: 0 },
  // { x: 100, y: 0 },
  // { x: 100, y: 100 },
  // { x: 0, y: 100 }
  // ], { x: 150, y: 50 });
  //
  // This should return { x: 100, y: 50 }. This should also work with shapes more complex than a square.
  // Do not hesitate to add comments about what could be improved given more time  
}