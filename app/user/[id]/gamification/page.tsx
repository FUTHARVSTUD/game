"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  CircularProgress,
  Alert,
  Button,
  Snackbar,
  Paper,
  Chip,
} from "@mui/material"
import {
  TrendingUp,
  LocalFireDepartment,
  Multiply,
  Terminal,
  EmojiEvents,
  Star,
  Security,
  Speed,
  Psychology,
  WorkspacePremium,
} from "@mui/icons-material"
import CountUp from "react-countup"

interface Badge {
  id: string
  label: string
  iconUrl: string
}

interface GamificationData {
  userId: string
  name: string
  avatarUrl: string
  totalPoints: number
  streakDays: number
  streakMultiplier: number
  totalCommandsExecuted: number
  badges: Badge[]
}

const iconMap: { [key: string]: React.ElementType } = {
  star: Star,
  security: Security,
  speed: Speed,
  psychology: Psychology,
  workspace_premium: WorkspacePremium,
  emoji_events: EmojiEvents,
}

export default function UserGamificationPage() {
  const params = useParams()
  const userId = params.id as string

  const [data, setData] = useState<GamificationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const fetchGamificationData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/user/${userId}/gamification`)

      if (!response.ok) {
        throw new Error("Failed to fetch gamification data")
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchGamificationData()
    }
  }, [userId])

  const handleEarnPoint = () => {
    if (data) {
      setData((prev) => (prev ? { ...prev, totalPoints: prev.totalPoints + 1 } : null))
      setSnackbarMessage("+1 point earned!")
      setSnackbarOpen(true)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  const handleRetry = () => {
    fetchGamificationData()
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Alert severity="error" sx={{ width: "100%", maxWidth: 600 }}>
            {error}
          </Alert>
          <Button variant="contained" onClick={handleRetry}>
            Retry
          </Button>
        </Box>
      </Container>
    )
  }

  if (!data) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info">No gamification data found</Alert>
      </Container>
    )
  }

  const getBadgeIcon = (iconUrl: string) => {
    const iconName = iconUrl.split("/").pop()?.split(".")[0] || "star"
    const IconComponent = iconMap[iconName] || Star
    return <IconComponent />
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Left Sidebar - User Profile */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={3}
            sx={{
              height: "100%",
              background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
              color: "white",
            }}
          >
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="300px"
                textAlign="center"
                gap={2}
              >
                <Avatar
                  src={data.avatarUrl}
                  alt={data.name}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "4px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                />
                <Typography variant="h5" fontWeight="bold">
                  {data.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Wells Fargo Team Member
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleEarnPoint}
                  startIcon={<TrendingUp />}
                  sx={{
                    mt: 2,
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      background: "rgba(255,255,255,0.3)",
                    },
                  }}
                >
                  Earn Point
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Main Area */}
        <Grid item xs={12} md={8}>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Metrics Bar */}
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                Performance Metrics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    elevation={2}
                    sx={{
                      "&:hover": { elevation: 4, transform: "translateY(-2px)" },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                      <TrendingUp color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h4" fontWeight="bold" color="primary">
                        <CountUp end={data.totalPoints} duration={2} />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Points
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    elevation={2}
                    sx={{
                      "&:hover": { elevation: 4, transform: "translateY(-2px)" },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                      <LocalFireDepartment sx={{ color: "#ff5722", fontSize: 40, mb: 1 }} />
                      <Typography variant="h4" fontWeight="bold" sx={{ color: "#ff5722" }}>
                        <CountUp end={data.streakDays} duration={2} />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Streak Days
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    elevation={2}
                    sx={{
                      "&:hover": { elevation: 4, transform: "translateY(-2px)" },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                      <Multiply sx={{ color: "#4caf50", fontSize: 40, mb: 1 }} />
                      <Typography variant="h4" fontWeight="bold" sx={{ color: "#4caf50" }}>
                        <CountUp end={data.streakMultiplier} duration={2} decimals={1} />x
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Multiplier
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    elevation={2}
                    sx={{
                      "&:hover": { elevation: 4, transform: "translateY(-2px)" },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                      <Terminal sx={{ color: "#9c27b0", fontSize: 40, mb: 1 }} />
                      <Typography variant="h4" fontWeight="bold" sx={{ color: "#9c27b0" }}>
                        <CountUp end={data.totalCommandsExecuted} duration={2} />
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Commands
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Badges Section */}
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                Achievements & Badges
              </Typography>
              <Grid container spacing={2}>
                {data.badges.map((badge) => (
                  <Grid item xs={12} sm={6} md={4} key={badge.id}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        textAlign: "center",
                        "&:hover": {
                          elevation: 4,
                          transform: "translateY(-2px)",
                          background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
                        },
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            width: 56,
                            height: 56,
                            boxShadow: "0 4px 12px rgba(25,118,210,0.3)",
                          }}
                        >
                          {getBadgeIcon(badge.iconUrl)}
                        </Avatar>
                        <Chip label={badge.label} color="primary" variant="outlined" size="small" />
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}
