import React from "react";

import { Layout } from "@comp/Layout";
import { DrawCanvas } from "@comp/canvas/DrawCanvas";
import { Grid } from "@comp/Grid";
import { Loading } from "@comp/Loading";
import { LineCanvas } from "@comp/canvas/LineCanvas";

export default function IndexPage() {
  return (
    <>
      <Layout>
        <Loading/>
        <Grid>
          <DrawCanvas color={"#eaf8f1"}/>
        </Grid>
        <LineCanvas />
      </Layout>
    </>
  )
}