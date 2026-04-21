import { primaryKey } from 'drizzle-orm/gel-core'
import { time } from 'drizzle-orm/mysql-core'
import {pgTable,serial,text,integer,timestamp,pgEnum,jsonb} from 'drizzle-orm/pg-core'

export const matchStatusEnum=pgEnum(
    'match_status',['scheduled','live','finished']
)

export const matches=pgTable('matches',{
    id:serial('id').primaryKey(),
    sport:text("sport").notNull(),
    team1:text('team_1').notNull(),
    team2:text("team_2").notNull(),
    status:matchStatusEnum('status').notNull().default('scheduled'),
    startTime:timestamp('start_time'),
    endTIme:timestamp("end_time"),
    team1Score:integer('team_1_score').notNull().default(0),
    team2Score:integer('team_2_score').notNull().default(0),
    createdAt:timestamp('created_at').notNull().defaultNow(),
})

export const commentary = pgTable('commentary', {
    id: serial('id').primaryKey(),
    matchId: integer('match_id')
    .notNull()
    .references(() => matches.id),
    minute: integer('minute'),
    sequence: integer('sequence'),
    period: text('period'),
    eventType: text('event_type'),
    actor: text('actor'),
    team: text('team'),
    message: text('message').notNull(),
    metadata: jsonb('metadata'),
    tags: text('tags').array(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});


