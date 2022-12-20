import React from "react";

import { Layout } from "@comp/Layout";
import { DrawCanvas } from "@comp/canvas/DrawCanvas";
import { Grid } from "@comp/Grid";
import { Loading } from "@comp/Loading";
import { CircleCanvas } from "@comp/canvas/CircleCamvas";

export default function SecondPage() {
  return (
    <>
      <Layout>
        <Loading/>
        <Grid>
          <DrawCanvas color={'#fff1f1'}/>
        </Grid>
        <CircleCanvas/>
      </Layout>
    </>
  )
}