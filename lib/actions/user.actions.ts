"use server"

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils"


// CREATE
export async function createUser(user: CreateUserParams) {
    try {
        await connectToDatabase();

        const newUser = await User.create(user);

        if (!newUser) throw new Error("Error creating user");

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error)
    }
}

// READ
export async function getUserById(userId: string) {
    try {
        await connectToDatabase();

        const user = await User.findById({ clerkId: userId })

        if (!user) throw new Error("User not found");

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error)
    }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate(
            { clerkId },
            user,
            { new: true })

        if (!updatedUser) throw new Error("Error updating User");

        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error)
    }
}

// DELETE
export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase();

        const userToDelete = await User.findOne({ clerkId });

        if (!userToDelete) throw new Error("User not found to delete");

        const deleteUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath("/")


        return deleteUser ? JSON.parse(JSON.stringify(deleteUser)) : null;
    } catch (error) {
        handleError(error)
    }
}