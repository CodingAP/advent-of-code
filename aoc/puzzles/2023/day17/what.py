from heapq import heappop, heappush

with open('input.txt','r') as f:
    carte =[[int(x) for x in row]for row in f.read().splitlines()]

n, m = len(carte), len(carte[0])


def isvalid(pos):
    return 0 <= pos[0] < n and 0 <= pos[1] < m

dirs = {'R':(0,1), 'L':(0,-1), 'D':(1,0), 'U':(-1,0)}
newdirs = {'R' : ('U','D'),  'L' : ('D','U'), 'U' : ('L','R'),  'D': ('R', 'L'), None : ('R','D') }

def tupladd(p,q):
    return (p[0]+q[0], p[1]+q[1])

def voisins( state ):
    pos, dir, count = state
    vois = []

    if dir != None:
        newpos = tupladd(pos, dirs[dir])
        if isvalid(newpos) and count+1 <= 3:
            i, j = newpos
            vois.append( (carte[i][j]   , (newpos, dir, count+1))  ) # straight

    for newdir in newdirs[dir]: # turns
        newpos = tupladd(pos, dirs[newdir])
        if isvalid(newpos):
            i, j = newpos
            vois.append( (carte[i][j]  , ( newpos, newdir, 1) )  )

    return vois


# Dijkstra on a graph of states : (pos, dir, count)
from math import inf
def dijkstra(debut):
    q = [ (0,  debut)   ]
    dists = {debut : 0}

    while len(q) > 0:
        dist, state = heappop(q)
        pos, dir, count = state
        i, j = pos

        if i == n-1 and j == m-1:
            return dist

        for (cost, v) in voisins(state):
            if dist + cost < dists.get(v, inf):
                dists[v] = dist + cost
                heappush(q, (dist + cost, v) )


debut = (0,0), None, 0
print('Part 1 :', dijkstra(debut))

## Part 2
def tupl4add(p,q):
    return (p[0]+4*q[0], p[1]+4*q[1])

def voisins( state ):
    pos, dir, count = state
    vois = []

    if dir != None:
        newpos = tupladd(pos, dirs[dir])
        if isvalid(newpos) and count+1 <= 10:
            i, j = newpos
            vois.append( (carte[i][j]  , (newpos, dir, count+1))  ) # straight

    for newdir in newdirs[dir]: # turns
        newpos = tupl4add(pos, dirs[newdir])
        if isvalid(newpos):
            i, j = pos
            match newdir:
                case 'R': cout = carte[i][j+1] + carte[i][j+2] + carte[i][j+3] + carte[i][j+4]
                case 'L': cout = carte[i][j-1] + carte[i][j-2] + carte[i][j-3] + carte[i][j-4]
                case 'U': cout = carte[i-1][j] + carte[i-2][j] + carte[i-3][j] + carte[i-4][j]
                case 'D': cout = carte[i+1][j] + carte[i+2][j] + carte[i+3][j] + carte[i+4][j]

            vois.append(  ( cout , ( newpos, newdir, 4) )  )

    return vois

debut = (0,0), None, 0
print('Part 2 :', dijkstra(debut))