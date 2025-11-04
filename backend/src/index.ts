import app from "./app";
import { PORT } from "./utils/config";
import logger from "./utils/logger";

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
