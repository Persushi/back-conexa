import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('film')
export class Film {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ unique: true })
    title: string;

    @Column({ nullable: true, type: 'integer' })
    episodeId?: number;

    @Column({ nullable: true, type: 'text' })
    openingCrawl?: string;

    @Column()
    director: string;

    @Column()
    producer: string;

    @Column({ type: 'date' })
    releaseDate: string;

    @Column({ nullable: true, type: 'simple-array' })
    characters?: string[];

    @Column({ nullable: true, type: 'simple-array' })
    planets?: string[];

    @Column({ nullable: true, type: 'simple-array' })
    starships?: string[];

    @Column({ nullable: true, type: 'simple-array' })
    vehicles?: string[];

    @Column({ nullable: true, type: 'simple-array' })
    species?: string[];

    @Column({ nullable: true, type: 'varchar', length: 255 })
    url?: string;
}
