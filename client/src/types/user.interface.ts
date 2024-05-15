export type UserUpdate = Partial<Omit<User, 'createdAt' | 'roles'>> & {
	readonly id: number
}

export enum Role {
	User,
	Helper,
	Admin,
	Owner
}

export enum Gender {
	Male = 'Male',
	Female = 'Female',
	Unknown = 'Unknown'
}

export interface User {
	id: number
	email: string
	name: string
	avatarURL: string
	phone: string | null
	createdAt: string

	aboutMe: string
	birthDate: string
	gender: Gender
	roles: Role[]
}
