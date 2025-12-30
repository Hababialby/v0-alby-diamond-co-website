import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Fetch all submissions ordered by most recent
    const { data: submissions, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching submissions:", error)
      return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
    }

    // Calculate stats
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const stats = {
      total: submissions?.length || 0,
      today: submissions?.filter((s) => new Date(s.created_at) >= todayStart).length || 0,
      thisWeek: submissions?.filter((s) => new Date(s.created_at) >= weekStart).length || 0,
    }

    return NextResponse.json({
      submissions: submissions || [],
      stats,
    })
  } catch (error) {
    console.error("Error in admin submissions route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient()
    const { ids, action } = await request.json()

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Invalid submission IDs" }, { status: 400 })
    }

    let updateData: any = {}

    switch (action) {
      case "star":
        updateData = { starred: true }
        break
      case "unstar":
        updateData = { starred: false }
        break
      case "archive":
        updateData = { archived: true }
        break
      case "unarchive":
        updateData = { archived: false }
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    const { error } = await supabase.from("contact_submissions").update(updateData).in("id", ids)

    if (error) {
      console.error("Error updating submissions:", error)
      return NextResponse.json({ error: "Failed to update submissions" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in admin submissions PATCH route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { ids } = await request.json()

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Invalid submission IDs" }, { status: 400 })
    }

    const { error } = await supabase.from("contact_submissions").delete().in("id", ids)

    if (error) {
      console.error("Error deleting submissions:", error)
      return NextResponse.json({ error: "Failed to delete submissions" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in admin submissions DELETE route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
