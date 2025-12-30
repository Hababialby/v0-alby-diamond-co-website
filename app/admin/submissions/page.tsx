"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Phone, MessageSquare, User, X, FileText, Download, Star, Archive, Trash2 } from "lucide-react"

interface Submission {
  id: string
  name: string
  email: string
  phone: string
  message: string | null
  product_name: string
  product_category: string
  created_at: string
  starred?: boolean
  archived?: boolean
  attachments?: Array<{ filename: string; content: string }>
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkActionLoading, setBulkActionLoading] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
  })

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/submissions")
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions)
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Error fetching submissions:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === submissions.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(submissions.map((s) => s.id)))
    }
  }

  const handleBulkAction = async (action: "star" | "archive" | "delete") => {
    if (selectedIds.size === 0) return

    setBulkActionLoading(true)
    try {
      const response = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: Array.from(selectedIds),
          action,
        }),
      })

      if (response.ok) {
        await fetchSubmissions()
        setSelectedIds(new Set())
      }
    } catch (error) {
      console.error(`Error performing ${action}:`, error)
    } finally {
      setBulkActionLoading(false)
    }
  }

  const downloadAttachment = (filename: string, content: string) => {
    const link = document.createElement("a")
    link.href = `data:application/octet-stream;base64,${content}`
    link.download = filename
    link.click()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground">Form Submissions</h1>
        <p className="text-muted-foreground mt-1">View and manage all contact form submissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Submissions</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Today</CardDescription>
            <CardTitle className="text-3xl">{stats.today}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-3xl">{stats.thisWeek}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Submissions</CardTitle>
              <CardDescription>Click on any row to view full details</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {selectedIds.size > 0 && (
                <>
                  <Badge variant="secondary" className="mr-2">
                    {selectedIds.size} selected
                  </Badge>
                  <Button
                    onClick={() => handleBulkAction("star")}
                    variant="outline"
                    size="sm"
                    disabled={bulkActionLoading}
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Star
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("archive")}
                    variant="outline"
                    size="sm"
                    disabled={bulkActionLoading}
                  >
                    <Archive className="h-4 w-4 mr-1" />
                    Archive
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("delete")}
                    variant="outline"
                    size="sm"
                    disabled={bulkActionLoading}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </>
              )}
              <Button onClick={fetchSubmissions} variant="outline" disabled={loading}>
                {loading ? "Loading..." : "Refresh"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIds.size === submissions.length && submissions.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Product Interest</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Attachments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No submissions yet
                    </TableCell>
                  </TableRow>
                ) : (
                  submissions.map((submission) => (
                    <TableRow
                      key={submission.id}
                      className={`cursor-pointer hover:bg-muted/50 ${
                        submission.starred ? "bg-yellow-50/50" : ""
                      } ${submission.archived ? "opacity-50" : ""}`}
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedIds.has(submission.id)}
                          onCheckedChange={() => toggleSelect(submission.id)}
                        />
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-2">
                          {submission.starred && <Star className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />}
                          {formatDate(submission.created_at)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{submission.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {submission.email}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {submission.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{submission.product_name}</div>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {submission.product_category}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {submission.message ? (
                          <div className="max-w-xs truncate text-sm text-muted-foreground">{submission.message}</div>
                        ) : (
                          <span className="text-sm text-muted-foreground italic">No message</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {submission.attachments && submission.attachments.length > 0 ? (
                          <div className="text-sm">
                            <Badge variant="outline">{submission.attachments.length} file(s)</Badge>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">None</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedSubmission && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            className="bg-background rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background border-b px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Submission Details</h2>
                <p className="text-sm text-muted-foreground mt-1">{formatFullDate(selectedSubmission.created_at)}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedSubmission(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <User className="h-5 w-5 text-accent" />
                  Contact Information
                </h3>
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-sm font-medium text-muted-foreground w-24">Name:</div>
                    <div className="text-sm text-foreground font-medium">{selectedSubmission.name}</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-sm font-medium text-muted-foreground w-24">Email:</div>
                    <a href={`mailto:${selectedSubmission.email}`} className="text-sm text-accent hover:underline">
                      {selectedSubmission.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-sm font-medium text-muted-foreground w-24">Phone:</div>
                    <a href={`tel:${selectedSubmission.phone}`} className="text-sm text-accent hover:underline">
                      {selectedSubmission.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Product Interest
                </h3>
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-sm font-medium text-muted-foreground w-24">Product:</div>
                    <div className="text-sm text-foreground font-medium">{selectedSubmission.product_name}</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-sm font-medium text-muted-foreground w-24">Category:</div>
                    <Badge variant="secondary">{selectedSubmission.product_category}</Badge>
                  </div>
                </div>
              </div>

              {selectedSubmission.message && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-accent" />
                    Message
                  </h3>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                      {selectedSubmission.message}
                    </p>
                  </div>
                </div>
              )}

              {selectedSubmission.attachments && selectedSubmission.attachments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    Attachments ({selectedSubmission.attachments.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedSubmission.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-accent" />
                          <span className="text-sm font-medium">{attachment.filename}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadAttachment(attachment.filename, attachment.content)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-background border-t px-6 py-4 flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                Close
              </Button>
              <Button asChild>
                <a href={`mailto:${selectedSubmission.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email Customer
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
