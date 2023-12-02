import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Props = {
  image: string;
  title: string;
  desc: string;
  onApply: <T extends any[]>(...params: T) => void
};

export const AccordionCard = ({ image, title, desc, onApply }: Props) => {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia sx={{ height: 100 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize=".6rem">
          {desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onApply}>Apply</Button>
      </CardActions>
    </Card>
  );
};
