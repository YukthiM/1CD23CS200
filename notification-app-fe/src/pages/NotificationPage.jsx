import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  Stack,
  Button,
  Chip,
} from "@mui/material";

import { useState } from "react";

import NotificationFilter from "../components/NotificationFilter";

import useNotifications from "../hooks/useNotifications";

export default function NotificationsPage() {
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [type, setType] = useState("ALL");

  const {
    notifications,
    loading,
    error,
  } = useNotifications(page, limit, type);

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 5 }}
    >
      <Typography
        variant="h4"
        gutterBottom
      >
        Campus Notifications
      </Typography>

      <NotificationFilter
        type={type}
        setType={setType}
        limit={limit}
        setLimit={setLimit}
      />

      {loading && (
        <CircularProgress />
      )}

      {error && (
        <Typography color="error">
          {error}
        </Typography>
      )}

      <Stack spacing={2}>
        {notifications.map((notification, index) => (
          <Card
            key={
              notification.id ||
              index
            }
            sx={{
              backgroundColor:
                notification.read
                  ? "#ffffff"
                  : "#E3F2FD",
            }}
          >
            <CardContent>
              <Typography variant="h6">
                {notification.title ||
                  "No Title"}
              </Typography>

              <Typography>
                {notification.message}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                mt={2}
              >
                <Chip
                  label={
                    notification.notification_type ||
                    "GENERAL"
                  }
                  color="primary"
                />

                <Chip
                  label={
                    notification.read
                      ? "Read"
                      : "Unread"
                  }
                  color={
                    notification.read
                      ? "success"
                      : "warning"
                  }
                />
              </Stack>

              <Typography
                variant="caption"
                display="block"
                mt={2}
              >
                {notification.created_at}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        mt={4}
      >
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
        >
          Previous
        </Button>

        <Button
          variant="contained"
          onClick={() =>
            setPage(page + 1)
          }
        >
          Next
        </Button>
      </Stack>
    </Container>
  );
}