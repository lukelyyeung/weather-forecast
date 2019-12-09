import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  cityForm: {
    margin: 16,
    maxWidth: '60%',
    width: 400
  },
  weatherIconGroups: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  smallAvatar: {
    width: 40,
    height: 40,
  },
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  errorMessage: {
    color: 'red',
  },
  textCenter: {
    textAlign: 'center',
  },
  emphasize: {
    fontWeight: 700,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    padding: 16,
    flexGrow: 1,
  },
  modal: {
    padding: 16,
    display: 'flex',
    overflowY: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 8,
  },
  paper: {
    padding: 16,
    backgroundColor: "#fff",
    border: '2px solid #fff',
    boxShadow: theme.shadows[5],
  },
}));