// Calculates geometric intersections for the virtual sandbox

export const dist = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

// Line-Line Intersection (Infinite lines for construction purposes, or segment? Construction lines are usually segments, but for intersections of arcs, etc.)
// We treat lines as segments for intersections to match visual drawing.
export const intersectLineLine = (l1, l2) => {
    const x1 = l1.x1, y1 = l1.y1, x2 = l1.x2, y2 = l1.y2;
    const x3 = l2.x1, y3 = l2.y1, x4 = l2.x2, y4 = l2.y2;

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (Math.abs(denominator) < 0.001) return []; // Parallel

    const t_line1 = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u_line2 = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

    // Check if intersection is within the bounds of both segments
    if (t_line1 >= 0 && t_line1 <= 1 && u_line2 >= 0 && u_line2 <= 1) {
        return [{ x: x1 + t_line1 * (x2 - x1), y: y1 + t_line1 * (y2 - y1) }];
    }
    return [];
};

// Circle-Circle Intersection
export const intersectCircleCircle = (c1, c2) => {
    const d = dist({ x: c1.cx, y: c1.cy }, { x: c2.cx, y: c2.cy });
    if (d > c1.r + c2.r) return []; // Too far apart
    if (d < Math.abs(c1.r - c2.r)) return []; // One circle within other
    if (d === 0 && c1.r === c2.r) return []; // Same circle

    const a = (c1.r * c1.r - c2.r * c2.r + d * d) / (2 * d);
    const h = Math.sqrt(Math.max(0, c1.r * c1.r - a * a));
    
    const x2 = c1.cx + a * (c2.cx - c1.cx) / d;
    const y2 = c1.cy + a * (c2.cy - c1.cy) / d;
    
    const rx = -h * (c2.cy - c1.cy) / d;
    const ry = h * (c2.cx - c1.cx) / d;
    
    if (h === 0) return [{ x: x2, y: y2 }];
    
    return [
        { x: x2 + rx, y: y2 + ry },
        { x: x2 - rx, y: y2 - ry }
    ];
};

// Line-Segment and Circle Intersection
export const intersectLineCircle = (line, circle) => {
    const dx = line.x2 - line.x1;
    const dy = line.y2 - line.y1;
    
    const fx = line.x1 - circle.cx;
    const fy = line.y1 - circle.cy;
    
    const a = dx * dx + dy * dy;
    const b = 2 * (fx * dx + fy * dy);
    const c = (fx * fx + fy * fy) - circle.r * circle.r;
    
    let discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return [];
    
    discriminant = Math.sqrt(discriminant);
    const t1 = (-b - discriminant) / (2 * a);
    const t2 = (-b + discriminant) / (2 * a);
    
    const pts = [];
    if (t1 >= 0 && t1 <= 1) pts.push({ x: line.x1 + t1 * dx, y: line.y1 + t1 * dy });
    if (t2 >= 0 && t2 <= 1) pts.push({ x: line.x1 + t2 * dx, y: line.y1 + t2 * dy });
    
    return pts;
};

// Generate all snap points based on drawn entities
export const getAllSnapPoints = (entities) => {
    const pts = [];
    
    // Add endpoints and centers
    entities.forEach(e => {
        if (e.type === 'line') {
            pts.push({ x: e.x1, y: e.y1 });
            pts.push({ x: e.x2, y: e.y2 });
        } else if (e.type === 'circle') {
            pts.push({ x: e.cx, y: e.cy });
        }
    });

    // Add pairwise intersections
    for (let i = 0; i < entities.length; i++) {
        for (let j = i + 1; j < entities.length; j++) {
            const e1 = entities[i];
            const e2 = entities[j];
            
            if (e1.type === 'line' && e2.type === 'line') {
                pts.push(...intersectLineLine(e1, e2));
            } else if (e1.type === 'circle' && e2.type === 'circle') {
                pts.push(...intersectCircleCircle(e1, e2));
            } else if (e1.type === 'line' && e2.type === 'circle') {
                pts.push(...intersectLineCircle(e1, e2));
            } else if (e1.type === 'circle' && e2.type === 'line') {
                pts.push(...intersectLineCircle(e2, e1));
            }
        }
    }
    
    // Deduplicate points (within 1px tolerance to avoid floating point explosion)
    const unique = [];
    pts.forEach(p => {
        if (!unique.some(u => dist(u, p) < 1)) {
            unique.push(p);
        }
    });
    
    return unique;
};

// Find the closest point in `points` to `p` within `threshold`. Returns null if none.
export const getClosestSnapPoint = (p, points, threshold = 15) => {
    let closest = null;
    let minDist = threshold;
    for (const pt of points) {
        const d = dist(p, pt);
        if (d < minDist) {
            minDist = d;
            closest = pt;
        }
    }
    return closest;
};
