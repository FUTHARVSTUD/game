import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration
const mockGamificationData = {
  userId: "user123",
  name: "Sarah Johnson",
  avatarUrl: "/placeholder.svg?height=120&width=120",
  totalPoints: 2847,
  streakDays: 15,
  streakMultiplier: 2.3,
  totalCommandsExecuted: 1256,
  badges: [
    {
      id: "security-expert",
      label: "Security Expert",
      iconUrl: "/icons/security.svg",
    },
    {
      id: "speed-demon",
      label: "Speed Demon",
      iconUrl: "/icons/speed.svg",
    },
    {
      id: "problem-solver",
      label: "Problem Solver",
      iconUrl: "/icons/psychology.svg",
    },
    {
      id: "team-player",
      label: "Team Player",
      iconUrl: "/icons/workspace_premium.svg",
    },
    {
      id: "innovator",
      label: "Innovator",
      iconUrl: "/icons/star.svg",
    },
    {
      id: "champion",
      label: "Champion",
      iconUrl: "/icons/emoji_events.svg",
    },
  ],
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real application, you would:
    // 1. Connect to MongoDB
    // 2. Query the gamification collection
    // 3. Return the user's gamification data

    // For now, return mock data with the requested userId
    const responseData = {
      ...mockGamificationData,
      userId: userId,
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Error fetching gamification data:", error)
    return NextResponse.json({ error: "Failed to fetch gamification data" }, { status: 500 })
  }
}

// Example of what a real MongoDB implementation might look like:
/*
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI!)

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await client.connect()
    const db = client.db('wells_fargo_internal')
    const collection = db.collection('user_gamification')
    
    const gamificationData = await collection.findOne({ userId: params.id })
    
    if (!gamificationData) {
      return NextResponse.json(
        { error: 'User gamification data not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(gamificationData)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await client.close()
  }
}
*/
